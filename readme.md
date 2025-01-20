# Flash - Fastest Way to Learning

Welcome to `Flash`, the super-duper E-Learning playground where everyone can jump in, connect, and sprinkle a little inspiration on each other! It’s all about making friends, sharing cool tricks, and helping one another learn how to learn—because let’s face it, self-teaching is the bee’s knees!

In this magical land of `Flash`, everyone gets to share their wacky ways of learning and their treasure troves of resources. So, come on down, find your favorite method, and get ready to teach yourself in the quirkiest way possible! Let’s make learning a blast!

## Table of Content
- [Features](#features)
    - [Video Session](#video-session)
- [Releases](#releases)
- [Tech and Stack](#tech-and-stack)
- [Installation](#installation)
    - [Contributor's Installation Guide](#contributors-installation-guide)
- [Team](#team)

# Features

## Video Session
[--Documentation Coming Soon--]

# Releases
## [Flash v0.0.1](#fast-v001)
[--Documentation Coming Soon--]

# Tech and Stack
- <b>Frontend: </b> `TailwindCSS`, `NextJS`, `JavaScript`
- <b>Backend: </b> `SpringBoot`, `Java`
- <b>Database: </b> `PostgreSQL`
- <b>Other Tools: </b> [`100msLive`](https://dashboard.100ms.live/developer)

# Installation

## Contributor's Installation Guide

- Clone the repo, or maybe just fork. Anyway:
    ```bash
    git clone https://github.com/saged-sama/Flash---Fastest-Way-to-Learn.git
    ```
- Make sure you have `PostgreSQL` server installed on the local system or you can use a cloud service who knows.
- Create a database in your postgres server
    ```sql
    -- login to postgres cli and run --
    CREATE DATABASE <Your Database Name>; -- or whatever name you like
    ```
- Add the database url, username, and password to `spring-backend`'s `application.properties`:
    ```bash
    spring.datasource.url=jdbc:postgresql://<Database Host>:<Database Port>/<Your Database Name>
    spring.datasource.username=<Your PostgreSQL server username>
    spring.datasource.password=<Your PostgreSQL user password>
    ```
- Go to [100msLive Dashboard](https://dashboard.100ms.live/developer) and get your keys and secrets. Set the environment variables in your project for the `100msLive` API:

    ```bash
    # linux or bash
    export access_key=<Your Key>
    export app_secret=<Your Key>
    export management_token=<Your Key>
    export template_id=<A template ID>
    export jwt_secret=$(openssl rand -base64 32)
    ```
    
    On windows, make sure you have downloaded and installed [OpenSSL](https://slproweb.com/products/Win32OpenSSL.html)
    ```
    # windows cmd
    set access_key=<Your Key>
    set app_secret=<Your Key>
    set management_token=<Your Key>
    set template_id=<A template ID>
    for /f "tokens=*" %i in ('openssl rand -base64 32') do set jwt_secret=%i
    ```
- Run the application using mvn:
    ```bash
    mvn spring-boot:run
    ```
- Go to `next-frontend`, install dependencies and run the frontend:
    ```
    npm install
    npm run dev
    ```

# About the Team

We're a team from `CSEDU`

 - <b>Sarower Jahan Rafin</b>
 - <b>Mahmudul Hasan Yeamim</b>
 - <b>Abrar Eyasir</b>
 - <b>Md Emon Khan</b>
 - <b>Mahmudul Hasan Sajid</b> 
