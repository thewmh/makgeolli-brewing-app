CREATE DATABASE "makgeolli_app";

CREATE TABLE "user_profiles" (
id SERIAL PRIMARY KEY,
first_name VARCHAR(60),
last_name VARCHAR(60),
image TEXT,
access_level integer
);

CREATE TABLE "recipes" (
id SERIAL PRIMARY KEY,
name VARCHAR(255),
is_published integer,
description TEXT,
image TEXT
);

CREATE TABLE "ingredient_units" (
id SERIAL PRIMARY KEY,
name VARCHAR(255)
);

CREATE TABLE "login_information" (
id SERIAL PRIMARY KEY,
username TEXT,
user_id integer REFERENCES user_profiles(id),
password VARCHAR(80)
);

CREATE TABLE "user_recipes"(
id SERIAL PRIMARY KEY,
user_profile_id integer REFERENCES user_profiles(id),
recipe_id integer REFERENCES recipes(id),
notes TEXT,
brew_date DATE
);

CREATE TABLE "tasting_rubric" (
id SERIAL PRIMARY KEY,
user_recipes_id integer REFERENCES user_recipes(id),
appearance integer,
aroma integer,
body integer,
taste integer,
finish integer,
estimated_abv integer,
notes TEXT
);

CREATE TABLE "recipe_ingredient_list" (
id SERIAL PRIMARY KEY,
name VARCHAR(255),
quantity integer,
units_id integer REFERENCES ingredient_units(id),
description TEXT,
recipes_id integer REFERENCES recipes(id)
);

CREATE TABLE "recipe_instruction_list" (
id SERIAL PRIMARY KEY,
instruction_number integer,
instruction_details TEXT,
recipes_id integer REFERENCES recipes(id)
);