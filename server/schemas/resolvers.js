const { AuthenticationError } = require('apollo-server-express');
const { User, Thought, Class, Tutor, Program } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    class: async (parent, { classId }) => {
      return Class.findOne({ _id: classId })
    },
    classes: async () => {
      return Trainer.find().populate('classes');
    },
    tutor: async (parent, { tutorId }) => {
      return Class.findOne({ _id: tutorId })
    },
    tutors: async () => {
      return Trainer.find().populate('tutors');
    },
    program: async (parent, { programId }) => {
      return Class.findOne({ _id: programId })
    },    
    programs: async () => {
      return Trainer.find().populate('programs');
    },        
    users: async () => {
      return User.find().populate('thoughts');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('thoughts');
    },
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },
    thought: async (parent, { thoughtId }) => {
      return Thought.findOne({ _id: thoughtId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('thoughts');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addClass: async(parent, { classTitle, classDescription, classInstructor, classLocation, classDateTimeStart, classDateTimeEnd }) => {
      const xclass = await Class.Create({classTitle, classDescription, classInstructor, classLocation, classDateTimeStart, classDateTimeEnd});
      return xclass;
    },

    addTutor: async(parent, {tutorTitle, tutorInstructor, tutorLocation, tutorDateTimeStart, tutorDateTimeEnd}) => {
      const tutor = await Tutor.Create({tutorTitle, tutorInstructor, tutorLocation, tutorDateTimeStart, tutorDateTimeEnd});
      return tutor;
    },

    addProgram: async(parent, {programTitle, programDescription, programInstructor, programLocation, programDateTimeStart, programDateTimeEnd}) => {
      const program = await Program.Create({programTitle, programDescription, programInstructor, programLocation, programDateTimeStart, programDateTimeEnd});
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
    },
    addThought: async (parent, { thoughtText }, context) => {
      if (context.user) {
        const thought = await Thought.create({
          thoughtText,
          thoughtAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { thoughts: thought._id } }
        );

        return thought;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addComment: async (parent, { thoughtId, commentText }, context) => {
      if (context.user) {
        return Thought.findOneAndUpdate(
          { _id: thoughtId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeThought: async (parent, { thoughtId }, context) => {
      if (context.user) {
        const thought = await Thought.findOneAndDelete({
          _id: thoughtId,
          thoughtAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { thoughts: thought._id } }
        );

        return thought;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeComment: async (parent, { thoughtId, commentId }, context) => {
      if (context.user) {
        return Thought.findOneAndUpdate(
          { _id: thoughtId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
