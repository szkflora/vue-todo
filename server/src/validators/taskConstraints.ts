import validate from 'validate.js';
import mongoose from 'mongoose';

validate.validators.boolean = function (value: any) {
  if (typeof value !== 'boolean') {
    return 'must be true or false';
  }
};

validate.validators.objectId = function (value: any) {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return 'is not a valid ObjectId';
  }
};

validate.extend(validate.validators.datetime, {
  parse: function(value: string) {
    const timestamp = Date.parse(value);
    return isNaN(timestamp) ? null : timestamp;
  },
  format: function(value: number) {
    return new Date(value).toISOString();
  }
});

const taskConstraints = {
  _id: {
    objectId: true,
  },
  title: {
    presence: { allowEmpty: false },
  },
  importance: {
    presence: true,
    inclusion: ['Low', 'Medium', 'High'],
  },
  completed: {
    boolean: true,
  },
  dueDate: {
  presence: true,
  datetime: true
  },
  userId: {
    presence: true,
  },
};

export const createTaskConstraints = {
  title: taskConstraints.title,
  importance: taskConstraints.importance,
  dueDate: taskConstraints.dueDate,
  userId: taskConstraints.userId,
};

export const updateImportanceConstraints = {
  _id: taskConstraints._id,
  importance: taskConstraints.importance,
};

export const updateStateConstraints = {
  _id: taskConstraints._id,
};

export const idConstraints = {
  _id: taskConstraints._id,
};
