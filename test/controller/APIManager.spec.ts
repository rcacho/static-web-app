import * as fs from "fs-extra";
import chai, {expect} from "chai";
import chaiAsPromised from "chai-as-promised";

import {APIManager} from "@/utils/APIManager"
import { DatabaseConnector } from "@/utils/DatabaseConnector";
import { Category } from "@/interfaces/Category";
import { Event } from "@/interfaces/Event";
import { DatabaseError } from "@/exceptions/DatabaseError";
import { User } from "@/interfaces/User";
import {FilterDAO} from "@/utils/dao/FilterDAO"
import filter from "@/pages/api/filter";

chai.use(chaiAsPromised);

//TODO: add two stuff, add two stuff same, remove stuff twice, update

describe("APIManager", function () {
	let apiManager: any = APIManager.getInstance();

	describe("Add/Remove/Get/update Category", function () {
		before(function () {
			console.info(`Before: ${this.test?.parent?.title}`);
		});

		beforeEach(function () {
			console.info(`BeforeTest: ${this.currentTest?.title}`);
		});

		afterEach(function () {
			console.info(`AfterTest: ${this.currentTest?.title}`);
		});

		it("Should add a category/ and get list of json (size 1)", function () {
			const category: Category = {category_id: 1, category_name: "test", admin_id: "admin", icon: "CircleOutlinedIcon", color: "blue"};
			apiManager.addCategory(category)
			return apiManager.getCategory()
				.then((result: any) => expect(result.length).to.equal(1));
		});

		it("Should add a category then remove", function () {
			const category: Category = {category_id: 1, category_name: "test", admin_id: "admin", icon: "CircleOutlinedIcon", color: "blue"};
			apiManager.addCategory(category)
			apiManager.deleteCategory(1, category)
			return apiManager.getCategory()
				.then((result: any) => expect(result.length).to.equal(0));
		});
    });

	describe("POst/Put/Get/Delete Event", function () {
		before(function () {
			console.info(`Before: ${this.test?.parent?.title}`);
		});

		beforeEach(function () {
			console.info(`BeforeTest: ${this.currentTest?.title}`);
		});

		afterEach(function () {
			console.info(`AfterTest: ${this.currentTest?.title}`);
		});

		it("Should add an event/ and get array of json (size 1)", function () {
			let date: Date = new Date("(01/01/0000)");
			const event: Event = {event_id: 1, event_date: date, event_description: "testing", admin_id: "admin", category_id: 5};
			apiManager.addEvent(event)
			return apiManager.getEvent()
				.then((result: any) => expect(result.length).to.equal(1));
		});

		it("Should add an event then remove", function () {
			let date: Date = new Date("(01/01/0000)");
			const event: Event = {event_id: 1, event_date: date, event_description: "testing", admin_id: "admin", category_id: 5};
			apiManager.addEvent(event)
			apiManager.deleteEvent(1, event)
			return apiManager.getEvent()
				.then((result: any) => expect(result.length).to.equal(0));
		});
    });

	describe("Get Notification", function () {
		before(function () {
			console.info(`Before: ${this.test?.parent?.title}`);
		});

		beforeEach(function () {
			console.info(`BeforeTest: ${this.currentTest?.title}`);
		});

		it("Should get notification", function () {
			return apiManager.getEvent()
				.then((result: any) => expect(result).to.be.an('array').that.contains(Notification));
		});
    });

	describe("Add/Remove/Get/update Category", function () {
		before(function () {
			console.info(`Before: ${this.test?.parent?.title}`);
		});

		beforeEach(function () {
			console.info(`BeforeTest: ${this.currentTest?.title}`);
		});

		afterEach(function () {
			console.info(`AfterTest: ${this.currentTest?.title}`);
		});

		it("Should add a category/ and get list of json (size 1)", function () {
			const category: Category = {category_id: 1, category_name: "test", admin_id: "admin", icon: "CircleOutlinedIcon", color: "blue"};
			apiManager.addCategory(category)
			return apiManager.getCategory()
				.then((result: any) => expect(result.length).to.equal(1));
		});

		it("Should add a category then remove", function () {
			const category: Category = {category_id: 1, category_name: "test", admin_id: "admin", icon: "CircleOutlinedIcon", color: "blue"};
			apiManager.addCategory(category)
			apiManager.deleteCategory(1, category)
			return apiManager.getCategory()
				.then((result: any) => expect(result.length).to.equal(0));
		});
    });

	describe("POst/Put/Edit/Get Event", function () {
		before(function () {
			console.info(`Before: ${this.test?.parent?.title}`);
		});

		beforeEach(function () {
			console.info(`BeforeTest: ${this.currentTest?.title}`);
		});

		afterEach(function () {
			console.info(`AfterTest: ${this.currentTest?.title}`);
		});

		it("Should add a user/ and get user (size 1)", function () {
			let date: Date = new Date("(01/01/0000)");
			const user: User = {user_id: 0, first_name: "bob", last_name: "bobbing", is_admin: 0, notification_check: date};
			apiManager.addUser(user)
			return apiManager.getUser(0)
				.then((result: any) => expect(result.length).to.equal(1));
		});

		it("Should update last login", function () {
			let date: Date = new Date("(01/01/0000)");
			const user: User = {user_id: 0, first_name: "bob", last_name: "bobbing", is_admin: 0, notification_check: date};
			apiManager.addUser(user)
			return apiManager.setUserLastLogin(0)
				.then((result: any) => expect(result.length).to.equal(String));
		});
    });

	describe("Get/Put Filter", function () {
		let filterDAO: FilterDAO;
		before(function () {
			console.info(`Before: ${this.test?.parent?.title}`);
			let db: DatabaseConnector = new DatabaseConnector;
			filterDAO = new FilterDAO(db);
		});

		beforeEach(function () {
			console.info(`BeforeTest: ${this.currentTest?.title}`);
		});

		afterEach(function () {
			console.info(`AfterTest: ${this.currentTest?.title}`);
		});

		it("Should set filter and get filter", function () {
			filterDAO.setFilters("test", [0, 1, 2]);
			return filterDAO.getFilters("test")
				.then((result: any) => expect(result).to.have.members([0, 1, 2]));
		});
    });
});