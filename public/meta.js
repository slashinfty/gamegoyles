const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const Discord = require('discord.js');
const Twitter = require('twitter');
const TiltifyClient = require("tiltify-api-client")
const { ApiClient } = require('twitch');
const { ChatClient } = require('twitch-chat-client');
const { AccessToken, RefreshableAuthProvider, StaticAuthProvider } = require('twitch-auth');

require('dotenv').config({ path: path.resolve(__dirname, '../.env')});

const commandsPath = path.resolve(__dirname, '../static/commands.json');
const commandsObject = require(commandsPath);
var commands = commandsObject.commands;

const layoutsPath = path.resolve(__dirname, '../static/layouts.json');
const layouts = require(layoutsPath);

const pronounsPath = path.resolve(__dirname, '../static/pronouns.json');
const pronounsList = require(pronounsPath);

const twitchTokensPath = path.resolve(__dirname, '../.twitch-tokens.json');
const twitchTokens = require(twitchTokensPath);

const toggleDisable = elementID => document.getElementById(elementID).disabled = !document.getElementById(elementID).disabled;

var stopwatch, apiClient;