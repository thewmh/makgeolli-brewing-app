CREATE DATABASE "makgeolli_app";

CREATE TABLE "user_profiles" (
id INT PRIMARY KEY,
first_name VARCHAR(60),
last_name VARCHAR(60),
image TEXT
);

CREATE TABLE "recipes" (
id INT PRIMARY KEY,
name VARCHAR(255),
is_published INT,
description TEXT,
image TEXT
);

CREATE TABLE "ingredient_units" (
id INT PRIMARY KEY,
name VARCHAR(255)
);

CREATE TABLE "login_information" (
id INT PRIMARY KEY,
username INT REFERENCES user_profiles(id),
password VARCHAR(80)
);

CREATE TABLE "user_recipes"(
id INT PRIMARY KEY,
user_profile_id INT REFERENCES user_profiles(id),
recipe_id INT REFERENCES recipes(id),
notes TEXT,
brew_date DATE
);

CREATE TABLE "tasting_rubric" (
id INT PRIMARY KEY,
user_recipes_id INT REFERENCES user_recipes(id),
appearance INT,
aroma INT,
body INT,
taste INT,
finish INT,
estimated_abv INT,
notes TEXT
);

CREATE TABLE "recipe_ingredient_list" (
id INT PRIMARY KEY,
name VARCHAR(255),
quantity INT,
units_id INT REFERENCES ingredient_units(id),
description TEXT,
recipes_id INT REFERENCES recipes(id)
);

CREATE TABLE "recipe_instruction_list" (
id INT PRIMARY KEY,
instruction_number INT,
instruction_details TEXT,
recipes_id INT REFERENCES recipes(id)
);