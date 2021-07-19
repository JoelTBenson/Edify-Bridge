const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Class {
    _id: ID
    classTitle: String
    classDescription:
    classInstructor: Trainer
    classLocation: String
    classDateTimeStart: Date
    classDateTimeEnd: Date
    classPrereqs: [Class]!
  }
  type Tutor {
    _id: ID
    tutorTitle: String
    tutorTrainer: Trainer
    tutorLocation: String
    tutorDateTimeStart: Date
    tutorDateTimeEnd: Date
  }
  type Program {
    programTitle: String
    programDescription: String
    programTrainer: Trainer
    programClasses: [Class]!
    programDateTimeStart: Date
    programDateTimeEnd: Date
    programClassPrereqs: [Class]!
    programProgramPrereqs: [Program]!
  }
  type User {
    _id: ID
    username: String
    email: String
    password: String
    thoughts: [Thought]!
  }

  type Thought {
    _id: ID
    thoughtText: String
    thoughtAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(thoughtId: ID!): Thought
    me: User
  }

  type Mutation {
    addClass(classId: ID!, classTitle: String!, classDescription: String!, classInstructor: Trainer: ID!, classLocation: String, classDateTimeStart: Date, classDateTimeEnd: Date)
    addTutor(tutorId: ID!, tutorTitle: String!, tutorInstructor: Trainer: ID!, tutorLocation: String, tutorDateTimeStart: Date, tutorDateTimeEnd: Date)
    addProgram(programId: ID!, programTitle: String!, programDescription: String!, programInstructor: Trainer: ID!, programDateTimeStart: Date, programDateTimeEnd: Date)
    addClassPrereq(classId: ID!, prereqId: ID!)
    addProgramPrereq(recordId: ID!, isClass: Boolean, prereqId: ID!)
    removeClass(classId: ID!)
    removeTutor(classId: ID!)
    removeProgram(classId: ID!)
    removeClassPrereq(classId: ID!, prereqId: ID!)
    removeProgramPrereq(recordId: ID!, isClass: Boolean, prereqId: ID!)
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addThought(thoughtText: String!): Thought
    addComment(thoughtId: ID!, commentText: String!): Thought
    removeThought(thoughtId: ID!): Thought
    removeComment(thoughtId: ID!, commentId: ID!): Thought
  }
`;

module.exports = typeDefs;
