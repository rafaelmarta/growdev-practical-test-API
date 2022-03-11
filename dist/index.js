"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Comment_1 = __importDefault(require("./classes/Comment"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
const allComments = [];
app.get('/', (request, response) => {
    response.json({
        msg: 'Homepage'
    });
});
app.get('/comments', (request, response) => {
    return response.json(allComments.map(comment => {
        return {
            name: comment.name,
            comment: comment.comment
        };
    }));
});
app.post('/comment', (request, response) => {
    const { name, comment } = request.body;
    const addComment = new Comment_1.default(name, comment);
    if (!name || !comment) {
        return response.status(400).json({
            msg: 'Name and/or Comment fields are blank.'
        });
    }
    if (name.trim().length < 3 || comment.trim().length < 3) {
        return response.status(400).json({
            msg: "Name and/or Comment fields must have at least 3 characters."
        });
    }
    allComments.push(addComment);
    return response.status(201).json({
        msg: "Comment added."
    });
});
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Server running...');
});
