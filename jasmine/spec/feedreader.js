'use strict';
/*global $, describe, it, expect, allFeeds, beforeEach, loadFeed*/
/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have not empty URLs', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBeNull();
            });
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have not empty names', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBeNull();
            });
        });
    });

    describe('The menu', function () {

        /* A test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        beforeEach(function () {
            this.menuIcon = $('.menu-icon-link');
            this.body = $('body');
        });

        it('has menu element hidden by default', function () {
            expect(this.body.hasClass('menu-hidden')).toBeTruthy();
        });

        /* A test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('changes visibility when the menu icon is clicked', function () {
            this.menuIcon.trigger('click');
            expect(this.body.hasClass('menu-hidden')).toBeFalsy();
            this.menuIcon.trigger('click');
            expect(this.body.hasClass('menu-hidden')).toBeTruthy();
        });
    });

    describe('Initial Entries', function () {
        var self;
        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function (done) {
            self = this;
            loadFeed(0, function () {
                self.loadedFeed = $('.feed .entry');
                done();
            });
        });

        it('are fetched by API call', function () {
            expect(self.loadedFeed.length).toBeGreaterThan(0);
        });
    });

    describe('New Feed Selection', function () {
        var self;
        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        beforeEach(function (done) {
            self = this;
            loadFeed(0, function () {
                self.initialFeed = $('.feed .entry');
                loadFeed(1, function () {
                    self.newFeed = $('.feed .entry');
                    done();
                });
            });
        });
        it('fetches new content of entries by API call', function () {
            expect(self.newFeed.length).toBeGreaterThan(0);
            expect(self.newFeed[0].innerHTML).not.toEqual(self.initialFeed[0].innerHTML);
        });

    });
}());
