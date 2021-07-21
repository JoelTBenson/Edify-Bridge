const { AuthenticationError } = require('apollo-server-express');
const { User, Class, Tutor, Program } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    class: async (parent, { classId }) => {
      return Class.findOne({ _id: classId })
    },
    classes: async () => {
      return Tutor.find().populate('classes');
    },
    tutor: async (parent, { tutorId }) => {
      return Class.findOne({ _id: tutorId })
    },
    tutors: async () => {
      return Tutor.find().populate('tutors');
    },
    program: async (parent, { programId }) => {
      return Class.findOne({ _id: programId })
    },    
    programs: async () => {
      return Tutor.find().populate('programs');
    },        
    users: async () => {
      return User.find().populate('thoughts');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('thoughts');
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('thoughts');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addClass: async(parent, { classTitle, classDescription, classInstructor, classLocation}) => {
      const xclass = await Class.Create({classTitle, classDescription, classInstructor, classLocation, classDateTimeStart, classDateTimeEnd});
      return xclass;
    },

    addTutor: async(parent, {tutorTitle, tutorInstructor, tutorLocation}) => {
      const tutor = await Tutor.Create({tutorTitle, tutorInstructor, tutorLocation, tutorDateTimeStart, tutorDateTimeEnd});
      return tutor;
    },

    addProgram: async(parent, {programTitle, programDescription, programInstructor, programLocation}) => {
      const program = await Program.Create({programTitle, programDescription, programInstructor, programLocation});
      return program;
    },

    addClassPrereq: async(parent, {recordId, isClass, prereqId}) => {
      if (isClass) {
        return Class.findOneAndUpdate(
          { _id: recordId},
          { $addToSet: { classPrereq: prereqId } }
        );
      } else {
      return Program.findOneAndUpdate(
        { _id: recordId},
        { $addToSet: { classPrereq: prereqId } }
        );
      }
    },    

    addProgramPrereq: async(parent, {recordId, isClass, prereqId}) => {
      if (isClass) {
        return Class.findOneAndUpdate(
          { _id: recordId},
          { $addToSet: { programClassPrereq: prereqId } }
        );
      } else {
      return Program.findOneAndUpdate(
        { _id: recordId},
        { $addToSet: { programProgramPrereq: prereqId } }
        );
      }
    },    
    removeClass: async(parent, { classId }) => {
      const xclass = await Class.findOneAndDelete({
        _id: classId,
      });
      return xclass;
    },
    removeTutor: async(parent, { tutorId }) => {
      const tutor = await Tutor.findOneAndDelete({
        _id: classId,
      });
      return tutor;
    },

    removeProgram: async(parent, { programId }) => {
      const program = await Program.findOneAndDelete({
        _id: programId,
      });
      return program;
    },
    removeClassPrereq: async(parent, { classId, prereqId }) => {
      const xclass = await Class.findOneAndDelete(
        { _id: classId },
        { $pull: { classPrereq: prereqId} }
      );
      return xclass;
    },

    removeProgramPrereq: async(parent, { recordId, isClass, prereqId }) => {
      if (isClass) {
        return Program.findOneAndDelete(
          { _id: recordId },
          { $pull: { classPrereq: prereqId} }
        );
      } else {
        return Program.findOneAndDelete(
          { _id: recordId },
          { $pull: { programPrereq: prereqId} }
        );
      }
    },

    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    }
  },
};

module.exports = resolvers;
