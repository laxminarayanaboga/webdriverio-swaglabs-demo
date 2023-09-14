import {Given, When, Then} from '@wdio/cucumber-framework';
import {expect, $} from '@wdio/globals'

import LoginPage from '../pageobjects/login.page.js';
import SecurePage from '../pageobjects/secure.page.js';

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
    // TODO: Move connection to global level to make a single DB connection.
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'springstudent',
        password: 'springstudent',
        database: 'demo',
        Promise: bluebird
    });

    const [rows, fields] = await connection.execute('SELECT * FROM `login_data` WHERE `scenario_name` = ?', [scenarioName]);
    login_scenario_data = {...rows[0]};

    await LoginPage.login(login_scenario_data.user_name, login_scenario_data.user_password);

});
