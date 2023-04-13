import * as user from "../user";

describe("POST /user", () => {
  it("should create a new user", async () => {
    const req = { body: { username: "user011", password: "12345" } };
    const res = {
      json({ token }) {
        expect(token).toBeTruthy();
      },
    };
    await user.createNewUser(req, res, () => {});
  });
});
