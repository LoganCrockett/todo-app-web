import { rest } from "msw";
import ResponseBody from "../../../models/api/ResponseBody.model";

export const handlers = [
    rest.post(`${import.meta.env.VITE_API_URL}/api/user/login`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json<ResponseBody<string>>({
                data: "Successfully logged in"
            })
        );
    })
];