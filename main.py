import csv
import numpy as np
import random

# team class used for instances of every individual team


class Team:
    wins = 0
    losses = 0
    rating = 1000.0
    name = ""
    conference = ""
    sim_wins = 0
    pre_sim_rating = 0

    def __init__(self, name_string, conf):
        self.name = name_string
        self.conference = conf


# this is a disgusting way to do this
pelicans = Team("pelicans", "w")
raptors = Team("raptors", "e")
lakers = Team("lakers", "w")
clippers = Team("clippers", "w")
bulls = Team("bulls", "e")
hornets = Team("hornets", "e")
pistons = Team("pistons", "e")
pacers = Team("pacers", "e")
cavaliers = Team("cavaliers", "e")
magic = Team("magic", "e")
timberwolves = Team("timberwolves", "w")
nets = Team("nets", "e")
grizzlies = Team("grizzlies", "w")
heat = Team("heat", "e")
celtics = Team("celtics", "e")
sixers = Team("sixers", "e")
wizards = Team("wizards", "e")
mavericks = Team("mavericks", "w")
knicks = Team("knicks", "e")
spurs = Team("spurs", "w")
thunder = Team("thunder", "w")
jazz = Team("jazz", "w")
kings = Team("kings", "w")
suns = Team("suns", "w")
nuggets = Team("nuggets", "w")
blazers = Team("blazers", "w")
hawks = Team("hawks", "e")
bucks = Team("bucks", "e")
rockets = Team("rockets", "w")
warriors = Team("warriors", "w")
teams = [pelicans,
         raptors, lakers,
         clippers, bulls,
         hornets, pistons,
         pacers, cavaliers,
         magic, timberwolves,
         nets, grizzlies,
         heat, celtics,
         sixers, wizards,
         mavericks, knicks,
         spurs, thunder,
         jazz, kings,
         suns, nuggets,
         blazers, hawks,
         bucks,
         rockets, warriors]


def get_team_obj(team_string):
    for team in teams:
        if team.name == team_string:
            return team

# called to calulate the elo rating of teams based on their performance in previously
# played games


def play_game(team1, score1, team2, score2):
    home_team = get_team_obj(team1)
    away_team = get_team_obj(team2)
    home_score = int(score1)
    away_score = int(score2)

    if home_score > away_score:
        home_team.wins = home_team.wins + 1
        away_team.losses = away_team.losses + 1
        calculate_elo(home_team, away_team)
    else:
        home_team.losses = home_team.losses + 1
        away_team.wins = away_team.wins + 1
        calculate_elo(away_team, home_team)

# Elo ratings are updated accordingly after every win or loss


def calculate_elo(win_team, lose_team):
    p_win_team = 1.0/(1.0+10.0 ** ((lose_team.rating-win_team.rating)/400.0))
    p_lose_team = 1.0-p_win_team

    win_team.rating = win_team.rating + 32.0 * (1.0-p_win_team)
    lose_team.rating = lose_team.rating + 32.0 * (0.0-p_lose_team)


# reading in all of the past games from this season to generate elo ratings
with open('games.csv', 'r') as csv_file:
    csv_reader = csv.reader(csv_file)

    next(csv_reader)
    for line in csv_reader:
        play_game(line[2].lower(), line[3], line[4].lower(), line[5])


for team in teams:
    team.pre_sim_rating = team.rating
    print team.name + " record: " + \
        str(team.wins) + "-" + str(team.losses) + \
        " team rating: " + str(team.rating)


# simulates a single game based of the elo ratings of teams.
# the probability is a function of elo ratings
def simulate_game(team1, team2):
    # elo rating stuff
    p_team1 = 1.0/(1.0+10.0 ** ((team2.rating-team1.rating)/400.0))
    for _ in range(100):
        x = np.random.binomial(1, p_team1)
        # after each game, calculate the new elo rating of the team
        if x == 1:
            calculate_elo(team1, team2)
            return 1
        else:
            calculate_elo(team2, team1)
            return 0


# returns the sorted standings
def calculate_standings(conf):
    full_conf = []
    for team in teams:
        if team.conference == conf:
            full_conf.append(team)
    conf_standings = sorted(
        full_conf, key=lambda team: team.wins, reverse=True)
    return conf_standings

# series are first of four: simulates a game at a time until one team gets to four teams


def simulate_series(team1, team2):
    win_t1 = 0
    win_t2 = 0
    game_num = 1
    while win_t1 < 4 and win_t2 < 4:
        x = simulate_game(team1, team2)
        if x == 1:
            win_t1 = win_t1 + 1
           # print team1.name + " has defeated " + \
            #team2.name + " in game num " + str(game_num)
        else:
            win_t2 = win_t2 + 1
            # print team2.name + " has defeated " + \
            #team1.name + " in game num " + str(game_num)

        game_num = game_num + 1

    winning_team = team1 if win_t1 == 4 else team2
    # print "series recap: " + team1.name + ": " + \
    #str(win_t1) + " " + team2.name + ": " + str(win_t2)

    return winning_team

# recursively simulates a single conference recursively, returns the winning team


def sim_conf_playoffs(conf_teams, series):
    if series == 1:
        return simulate_series(conf_teams[0], conf_teams[1])
    round_results = []
    for i in range(series):
        high_seed = len(conf_teams)-1 - i
        round_results.append(
            simulate_series(conf_teams[i], conf_teams[high_seed]))

    return sim_conf_playoffs(round_results, series/2)


# simulates the playoffs by first simulating the eastern conf, then the western conf.
# then, it simulates the winner of the west vs the east
def simulate_playoffs():
    east_teams = calculate_standings("e")
    west_teams = calculate_standings("w")
    east_playoff_teams = east_teams[0:8]
    west_playoff_teams = west_teams[0:8]
    east_finalist = sim_conf_playoffs(east_playoff_teams, 4)
    west_finalist = sim_conf_playoffs(west_playoff_teams, 4)
    champion = simulate_series(east_finalist, west_finalist)
    print("THE " + champion.name + " has won the finals!")
    return champion


# simulates the playoffs 100 times.
print(simulate_playoffs().name)
for i in range(100):
    for team in teams:
        team.rating = team.pre_sim_rating
    winning_team = simulate_playoffs()
    winning_team.sim_wins = winning_team.sim_wins + 1

print("this is the # wins for each team after 100 simulated playoffs")
for team in teams:
    print(team.name + str(team.sim_wins))
