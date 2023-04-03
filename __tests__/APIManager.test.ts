import { Category } from "@/interfaces/Category";
import { User } from "@/interfaces/User";
import { APIManager } from "../src/utils/APIManager";
import { FilterDAO } from "../src/utils/dao/FilterDAO";
import { DatabaseConnector } from "../src/utils/DatabaseConnector";
import { Event } from "@/interfaces/Event";

//TODO: add two stuff, add two stuff same, remove stuff twice, update

describe("APIManager", function () {
	let apiManager: any;

	beforeAll(async ()=> {
		apiManager = await APIManager.getInstance();
	});

	describe("Add/Remove/Get/update Category", function () {

		test("Should add a category", async ()=> {
			const category: any = {category_id: 1, category_name: "test", icon: "CircleOutlinedIcon", color: "blue"};
			return apiManager.addCategory(category)
				.then((result: any) => expect(result.length).to.equal(1));
		});

		test("Should add a category/ and get list of json (size 1)", async ()=> {
			const category: Category = {category_id: 1, category_name: "test", icon: "CircleOutlinedIcon", color: "blue"};
			await apiManager.addCategory(category)
			return apiManager.getCategory()
				.then((result: any) => expect(result.length).to.equal(1));
		});

		test("Should add a category then remove", async ()=> {
			const category: Category = {category_id: 1, category_name: "test", icon: "CircleOutlinedIcon", color: "blue"};
			await apiManager.addCategory(category)
			await apiManager.deleteCategory(1, category)
			return apiManager.getCategory()
				.then((result: any) => expect(result.length).to.equal(0));
		});
    });

	describe("Post/Put/Get/Delete Event", function () {

		test("Should add an event/ and get array of json (size 1)", async ()=>{
			let date: Date = new Date("(01/01/0000)");
			const event: Event = {event_id: 1, event_date: date, event_description: "testing", category_id: 5};
			await apiManager.addEvent(event)
			return apiManager.getEvent()
				.then((result: any) => expect(result.length).to.equal(1));
		});

		test("Should add an event then remove", async ()=> {
			let date: Date = new Date("(01/01/0000)");
			const event: Event = {event_id: 1, event_date: date, event_description: "testing", category_id: 5};
			await apiManager.addEvent(event)
			await apiManager.deleteEvent(1, event)
			return apiManager.getEvent()
				.then((result: any) => expect(result.length).to.equal(0));
		});
    });

	describe("Get Notification", function () {

		test("Should get notification", async ()=> {
			return apiManager.getEvent()
				.then((result: any) => expect(result).to.be.an('array').that.contains(Notification));
		});
    });

	describe("POst/Put/Edit/Get User", function () {

		test("Should add a user/ and get user (size 1)", async ()=> {
			let date: Date = new Date("(01/01/0000)");
			const user: User = {user_id: "test", first_name: "bob", last_name: "bobbing", is_admin: 0, notification_check: date};
			await apiManager.addUser(user)
			return apiManager.getUser(0)
				.then((result: any) => expect(result.length).to.equal(1));
		});

		test("Should update last login", async ()=> {
			let date: Date = new Date("(01/01/0000)");
			const user: User = {user_id: "test", first_name: "bob", last_name: "bobbing", is_admin: 0, notification_check: date};
			await apiManager.addUser(user)
			return apiManager.setUserLastLogin(0)
				.then((result: any) => expect(result.length).to.equal(String));
		});
    });

	describe("Get/Put Filter", function () {
		let filterDAO: FilterDAO;
		beforeAll(function () {
			let db: DatabaseConnector = new DatabaseConnector;
			filterDAO = new FilterDAO(db);
		});

		test("Should set filter and get filter", async ()=> {
			await filterDAO.setFilters("test", [0, 1, 2]);
			return filterDAO.getFilters("test")
				.then((result: any) => expect(result).to.have.members([0, 1, 2]));
		});
    });
});