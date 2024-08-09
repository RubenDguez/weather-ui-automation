@subSuite=Layout

Feature: Weather Dashboard

	Background:
		Given I am in the Weather Dashboard webapp

	Scenario: should have Weather Dashboard in title
		Then I can verify that the page has Weather Dashboard as title

	Scenario: should have Weather Dashboard as main header
		Then I can verify that the page has Weather Dashboard as main header
	
	Scenario: should have search input
		Then I can verify that the page has search input
		And I can verify that the page has one search input
