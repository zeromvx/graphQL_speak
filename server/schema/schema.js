const graphql = require('graphql');
const Books = require('../models/Book');
const Authors = require('../models/Author');

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList, GraphQLNonNull} = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: new GraphQLNonNull(GraphQLString)},
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return Authors.findById(parent.authorId);
            }
        }
    }),
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: new GraphQLNonNull(GraphQLString)},
    }),
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addBook: {
            type: BookType,
            args: {
                title: {type: new GraphQLNonNull(GraphQLString)},
                description: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, {title, description}) {
                const book = new Books({
                    title,
                    description,
                    authorId: "5fb2041a2eb1d988e6f3604f",
                })

                return book.save();
            },
        },
        deleteBook: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, {id}) {
                return Books.findByIdAndRemove(id);
            }
        },
    }
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, {id}) {
                return Books.findById(id);
            },
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Books.find({});
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation,
});