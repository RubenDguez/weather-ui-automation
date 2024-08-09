import { Given, When, Then, Before } from '@wdio/cucumber-framework';
import { expect, $ } from '@wdio/globals';
import WeatherDashboard from '../pages/dashboard.ts';

const WEATHER_DASHBOARD = new WeatherDashboard();

Before(async () => {
	WEATHER_DASHBOARD.open();
});

Given('I am in the Weather Dashboard webapp', async () => {
	await WEATHER_DASHBOARD.mainHeader.waitForDisplayed();
	const isDisplayed = await WEATHER_DASHBOARD.mainHeader.isDisplayed();

	expect(true).toEqual(isDisplayed);
});

When('I search for {string}', async (city: string) => {
    await browser.refresh();
    await WEATHER_DASHBOARD.search(city);
});

When('I click on trash can button for {string}', async(city: string) => {
    await WEATHER_DASHBOARD.getDeleteButton(city).waitForDisplayed();
    await WEATHER_DASHBOARD.getDeleteButton(city).click();
});

Then('I can verify that the page has Weather Dashboard as title', async () => {
	const title = await browser.getTitle();
	expect('Weather Dashboard').toEqual(title);
});

Then('I can verify that the page has Weather Dashboard as main header', async () => {
	const headerText = await WEATHER_DASHBOARD.mainHeader.getText();
	expect('Weather Dashboard').toEqual(headerText);
});

Then('I can verify that the page has search input', async () => {
	await WEATHER_DASHBOARD.searchInput.waitForDisplayed();
	const isDisplayed = await WEATHER_DASHBOARD.searchInput.isDisplayed();

	expect(true).toEqual(isDisplayed);
});

Then('I can verify that the page has one search input', async () => {
	await WEATHER_DASHBOARD.searchInput.waitForDisplayed();
	const searchInputCount = (await WEATHER_DASHBOARD.searchInputArray).length;

	expect(1).toEqual(searchInputCount);
});

Then('I can verify {string} is displayed in search title', async(city: string) => {
    const searchTitleText = await WEATHER_DASHBOARD.searchTitle.getText();
    await expect(searchTitleText.includes(city)).toBeTruthy();
});

Then('I can verify {string} is NOT displayed in search title', async(city: string) => {
    const searchTitleText = await WEATHER_DASHBOARD.searchTitle.getText();
    await expect(searchTitleText.includes(city)).not.toBeTruthy();
});

Then('I can verify {string} is added to the search history', async(city) => {
    await expect(WEATHER_DASHBOARD.getHistoryButton(city)).toBeDisplayed();
});

Then('I can verify {string} is NOT added to the search history', async(city) => {
    await expect(WEATHER_DASHBOARD.getHistoryButton(city)).not.toBeDisplayed();
});

Then('I can verify search produced {int} forecast cards', async(forecastCount: number) => {
    await WEATHER_DASHBOARD.getForecastCard().waitForDisplayed({reverse: (!forecastCount) ? true : false});
    const forecastCardArrayLength = (await WEATHER_DASHBOARD.forecastCardArray).length;

    expect(forecastCount).toEqual(forecastCardArrayLength);
})

Then('I can verify that only 1 {string} city name is displayed in history', async(city: string) => {
    await WEATHER_DASHBOARD.getDeleteButton(city);
    const deleteButtonArray = await WEATHER_DASHBOARD.getDeleteButtonArray(city);
    await deleteButtonArray[0].waitForDisplayed();


    expect(1).toEqual(deleteButtonArray.length);
})

Then('I can verify {string} as been deleted from history', async(city: string) => {
    await WEATHER_DASHBOARD.getDeleteButton(city).waitForDisplayed({reverse: true});
    await expect(WEATHER_DASHBOARD.getDeleteButton(city)).not.toBeDisplayed();
})
