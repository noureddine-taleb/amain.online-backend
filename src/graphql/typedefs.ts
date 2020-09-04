import { gql } from "apollo-server-express";

export const typeDefs = gql`
    type Project {
        _id: ID
        name: String
        desc: String
        fees: String
        unit: String
        createdByID: User
        createdAt: String
    }

    type User {
        _id: ID
        name: String
        phone: String
        dob: String
        image: String
        _isAdmin: String
        createdAt: String
    }

    # type Payment {
    #     _id: ID
    #     billID: Bill
    #     amount: String
    #     createdByID: User
    #     createdAt: String
    # }

    # type Bill {
    #     _id: ID
    #     userID: User
    #     quantity: String
    #     projectID: Project
    #     createdByID: User
    #     createdAt: String
    # }

    type Query {
        projects(
            _id: ID
            name: String
            desc: String
            fees: String
            unit: String
            createdByID: String
            createdAt: String
        ): [Project]

        users(
            _id: ID
            name: String
            phone: String
            dob: String
            image: String
            _isAdmin: String
            createdAt: String
        ): [User]

        # payments(
        #     _id: ID
        #     billID: String
        #     amount: String
        #     createdByID: String
        #     createdAt: String
        # ): [Payment]

        # bills(
        #     _id: ID
        #     userID: String
        #     quantity: String
        #     projectID: String
        #     createdByID: String
        #     createdAt: String
        # ): [Bill]
    }
`