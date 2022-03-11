import express, {Request, Response} from 'express';
import Comment from './classes/Comment';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



const allComments: Comment[] = [];

app.get('/', (request: Request, response: Response) => {
    response.json({
        msg: 'Homepage'
    })
});

app.get('/comments', (request: Request, response: Response) => {
    return response.json(allComments.map(comment => {
        return {
            name: comment.name,
            comment: comment.comment
        }
    }))
});

app.post('/comment', (request: Request, response: Response) => {
    const { name, comment } = request.body;
    const addComment = new Comment(name, comment);

    if(!name || !comment) {
        return response.status(400).json({
            msg: 'Name and/or Comment fields are blank.'
        })
    }

    if(name.trim().length < 3 || comment.trim().length < 3){
        return response.status(400).json({
            msg: "Name and/or Comment fields must have at least 3 characters."
        })
    }

    allComments.push(addComment);
    return response.status(201).json({
        msg: "Comment added."
    })
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('The server is running...');
})