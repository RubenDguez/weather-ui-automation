import { $ } from '@wdio/globals';
import Page from '../models/page.ts';

export default class WeatherDashboard extends Page {
	get mainHeader() {
		return $('//body/header//h1');
	}

	get searchInput() {
		return $('//body//input[@id="search-input"]');
	}

	get searchInputArray() {
		return $$('//body//input[@id="search-input"]');
	}

	get searchButton() {
		return $('//body//button[@id="search-button"]');
	}

	get searchTitle() {
		return $('//body//h2[@id="search-title"]');
	}

    get forecastCardArray() {
        return $$('//body//div[contains(@class, "forecast-card")]');
    }

    getForecastCard(index: number = 1) {
        return $(`(//body//div[contains(@class, "forecast-card")])[${index}]`);
    }

	getHistoryButton(label: string) {
		return $(`//body//button[contains(@class, "history")][text()="${label}"]`);
	}

	get firstDeleteButton() {
		return $('(//body//button[contains(@class, "delete")])[1]');
	}

	getDeleteButton(city: string) {
		return $(`(//body//button[contains(@class, "delete")][contains(@data-city, "${city}")])[1]`);
	}

	getDeleteButtonArray(city: string) {
		return $$(`//body//button[contains(@class, "delete")][contains(@data-city, "${city}")]`);
	}

	get deleteButtonArray() {
		return $$('//body//button[contains(@class, "delete")]');
	}


    async search(city: string) {
        const searchTitleText = await this.searchTitle.getText();

        await this.searchInput.waitForDisplayed();
        await this.searchInput.setValue(city);
        await this.searchButton.click();

        await browser.waitUntil(async() => (await this.searchTitle.getText() !== searchTitleText));
    }

	override async open() {
		super.open('');
	}
}
