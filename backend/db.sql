-- BattleCards Database Schema
-- PostgreSQL

-- Users Table: Tracks registered users and anonymous sessions.
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    total_votes INT DEFAULT 0,
    controversial_votes INT DEFAULT 0,
    last_active TIMESTAMP WITH TIME ZONE,
    is_anonymous BOOLEAN DEFAULT TRUE
);

-- Creatures Table: Master list of all animals/creatures.
CREATE TABLE Creatures (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    category VARCHAR(100),
    image_url VARCHAR(255),
    power_rating INT,
    size_category VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Matchups Table: Stores unique matchup combinations.
CREATE TABLE Matchups (
    id SERIAL PRIMARY KEY,
    creature_a_id INT REFERENCES Creatures(id),
    creature_a_quantity INT,
    creature_b_id INT REFERENCES Creatures(id),
    creature_b_quantity INT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(creature_a_id, creature_a_quantity, creature_b_id, creature_b_quantity)
);

-- Sessions Table: Tracks anonymous sessions and their voting history.
CREATE TABLE Sessions (
    id SERIAL PRIMARY KEY,
    session_token UUID DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_active TIMESTAMP WITH TIME ZONE,
    total_votes INT DEFAULT 0,
    user_id INT REFERENCES Users(id) NULL
);

-- Votes Table: Individual vote records.
CREATE TABLE Votes (
    id SERIAL PRIMARY KEY,
    matchup_id INT REFERENCES Matchups(id),
    user_id INT REFERENCES Users(id),
    session_id INT REFERENCES Sessions(id),
    chosen_side CHAR(1) CHECK (chosen_side IN ('A', 'B')),
    voted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(matchup_id, user_id) -- A user can only vote once per matchup
);

-- MatchupStats Table: Precomputed vote totals for fast results display.
CREATE TABLE MatchupStats (
    matchup_id INT PRIMARY KEY REFERENCES Matchups(id),
    total_votes INT DEFAULT 0,
    side_a_votes INT DEFAULT 0,
    side_b_votes INT DEFAULT 0,
    last_vote_at TIMESTAMP WITH TIME ZONE
);

-- PopularMatchups Table: Tracks viral/popular matchups.
CREATE TABLE PopularMatchups (
    id SERIAL PRIMARY KEY,
    matchup_id INT REFERENCES Matchups(id),
    vote_count INT,
    controversy_score FLOAT,
    trending_score FLOAT,
    updated_at TIMESTAMP WITH TIME ZONE
);

-- Indexes for performance
CREATE INDEX idx_votes_matchup_user ON Votes(matchup_id, user_id);
CREATE INDEX idx_votes_session_matchup ON Votes(session_id, matchup_id);
CREATE INDEX idx_matchupstats_popularity ON MatchupStats(total_votes DESC);
CREATE INDEX idx_matchups_creatures ON Matchups(creature_a_id, creature_b_id);
