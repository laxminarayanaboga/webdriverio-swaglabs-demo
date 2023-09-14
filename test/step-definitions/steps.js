import {Given, When, Then} from '@wdio/cucumber-framework';
import {expect, $} from '@wdio/globals'

import LoginPage from '../pageobjects/login.page.js';
import SecurePage from '../pageobjects/secure.page.js';

// import mysql from 'mysql2';

import mysql from 'mysql2/promise';
import bluebird from 'bluebird';

const pages = {
    login: LoginPage
}

var login_scenario_data;

Given(/^I am on the (\w+) page$/, async (page) => {
    await pages[page].open();
});

When(/^I login with (\w+) and (.+)$/, async (username, password) => {
    await LoginPage.login(username, password)
});

Then(/^I should see a flash message saying (.*)$/, async (message) => {
    await expect(SecurePage.flashAlert).toBeExisting();
    await expect(SecurePage.flashAlert).toHaveTextContaining(message);
});

Then(/^I should see a flash error message$/, async () => {
    await expect(SecurePage.flashAlert).toBeExisting();
    await expect(SecurePage.flashAlert).toHaveTextContaining(login_scenario_data.expected_error_message);
});

Given(/^I login with (\w+)$/, async (scenarioName) => {

    // var con = await mysql.createConnection({
    //     host: "localhost",
    //     user: "springstudent",
    //     password: "springstudent",
    //     database: "demo"
    // });
    //
    // await con.connect(function (err) {
    //     if (err) throw err;
    //     con.query("SELECT * FROM login_data", function (err, result, fields) {
    //         if (err) throw err;
    //         console.log(result);
    //         console.log(result[0]);
    //         console.log(result[0].scenario_name);
    //         login_scenario_data = result[0];
    //     });
    // });


    // get the client
    // const mysql = require('mysql2/promise');

// get the promise implementation, we will use bluebird
//     const bluebird = require('bluebird');

// create the connection, specify bluebird as Promise
    const connection = await mysql.createConnection({host:'localhost', user: 'springstudent',password: 'springstudent', database: 'demo', Promise: bluebird});

// query database
    const [rows, fields] = await connection.execute('SELECT * FROM `login_data` WHERE `scenario_name` = ?', ['invalid_user_name_and_password']);

    console.log("rows: " + rows);
    console.log("rows[0]: " + rows[0]);
    console.log("rows[0].user_name: " + rows[0].user_name);

    login_scenario_data = {...rows[0]};
    // console.log("login_scenario_data: " + login_scenario_data);
    await LoginPage.login(login_scenario_data.user_name, login_scenario_data.user_password);

});
