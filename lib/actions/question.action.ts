/**
 *  all of server actions for the question model
 *
 */

'use server';

import { connectToDatabase } from '../mongoose';
import Question from '@/database/question.model';
import Tag from '@/database/tag.model';

import User from '@/database/user.model';
import { revalidatePath } from 'next/cache';
import { EditQuestionParams, GetQuestionsParams } from './shared.types';

export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDatabase();

    const questions = await Question.find({})
      .populate({
        path: 'tags',
        model: Tag
      })
      .populate({
        path: 'author',
        model: User
      })
      .sort({ createdAt: -1 });

    return { questions };
  } catch (error) {
    console.error(` ${error} `);
    throw error;
  }
}

export async function createQuestion(params: any) {
  try {
    // connect to DB
    connectToDatabase();

    // Accepr some parameteres form the front end
    // everything that we pass from our form.
    const { title, content, tags, author, path } = params;

    // Create the question
    const question = await Question.create({
      title,
      content,
      author
    });

    const tagDocuments = [];

    /**
     * Find an existing Tag or create a new one, and
     * associate it with a question.
     *
     * This function performs a search for a Tag
     * with the specified name, and if it doesn't exist,
     * it creates a new Tag with that name and associates
     * it with the provided question.
     *
     */
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, 'i') } }, // find something
        { $setOnInsert: { name: tag }, $push: { question: question._id } }, // do something on it
        { upsert: true, new: true } // additional options
      );

      tagDocuments.push(existingTag._id);
    }

    // Update the question
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } }
    });

    // Create an interaction recrod for the user's
    // ask_question action

    // Increment author's reputation by +5 points because
    // he created a question

    // revalidatePath allows you to purge cached data on-demand for a specific path.
    revalidatePath(path);
  } catch (error) {}
}

export async function editQuestion(params: EditQuestionParams) {
  try {
    connectToDatabase();

    const { questionId, title, content, path } = params;

    const question = await Question.findById(questionId).populate("tags");

    if (!question) {
      throw new Error("Question not found");
    }

    question.title = title;
    question.content = content;

    await question.save();

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}