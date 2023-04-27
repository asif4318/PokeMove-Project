# Pokemove Project
#### Authored by: Asif Islam, Mathew Alangadan, Matthew Li
A project that finds all the pokemon that can learn a given move based on a CSV file of 100,000 data points. The data is loaded into a custom hash map and splay tree implementations to allow for quick searching. Additionally, clicking on a pokemon takes you to a page where each of the pokemon's moves are listed with sprites and a link to the Smogon database for further information about the move.

This project demonstrates knowledge of data structures, namely splay trees and hashmaps which were created from scratch. The performance of hash maps to splay trees can be compared in this project via a toggle that returns how long it takes each respective data structure to return search results.

## Project Layout

- `frontend` folder contains React frontend
- `backend` folder contains Python API with Hashmap and Splay Tree Implementations
- `playground` folder contains code for CSV generation and some experimentation code used to explore the learnsets.json data set

## Project Setup

### Frontend Setup

- `cd frontend`
- `npm install`
- `npm start`

### Backend Setup

- `cd backend`
- `python3 -m venv venv`
- `. venv/bin/ activate`
- `python3 backend.py`
