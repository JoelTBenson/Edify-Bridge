const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Class {
    _id: ID
    classTitle: String
    classDescription: String
    classInstructor: Tutor
    classLocation: String
    classPrereqs: [Class]!
  }

  type Tutor {
    _id: ID
    tutorTitle: String
    tutorLocation: String
  }

  type Program {
    programTitle: String
    programDescription: String
    programTrainer: Tutor
    programClasses: [Class]!
    programClassPrereqs: [Class]!
    programProgramPrereqs: [Program]!
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
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
    class: Class
    classes: [Class]
    tutor: Tutor
    tutors: [Tutor]
    program: Program
    programs: [Program]
    users: [User]
    user(username: String!): User
    me: User
  }

  type Mutation {
    addClass(classId: ID!, classTitle: String!, classDescription: String!, classInstructor: ID!, classLocation: String): Class
    addTutor(tutorId: ID!, tutorTitle: String!, tutorInstructor: String!, tutorLocation: String): Tutor
    addProgram(programId: ID!, programTitle: String!, programDescription: String!, programInstructor: String!, programTutor: ID!): Program
    addClassPrereq(classId: ID!, prereqId: ID!): Program
    addProgramPrereq(recordId: ID!, isClass: Boolean, prereqId: ID!): Program
    removeClass(classId: ID!): Class
    removeTutor(classId: ID!): Tutor
    removeProgram(classId: ID!): Program
    removeClassPrereq(classId: ID!, prereqId: ID!): Class
    removeProgramPrereq(recordId: ID!, isClass: Boolean, prereqId: ID!): Program
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
