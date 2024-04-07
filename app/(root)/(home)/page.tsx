import QuestionCard from "@/components/shared/cards/QuestionCard";
import HomeFilters from "@/components/shared/home/HomeFilters";
import LocalSearchbar from "@/components/shared/LocalSearchbar";
import NoResult from "@/components/shared/NoResult";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Filter from "@/components/shared/Filter";
import { HomePageFilters } from "@/constants/filters";


const questions  = [
  {
    _id: "1",
    title: "How to add icons in reactJs?",
    tags: [
      { _id: "1", name: "Reactjs" },
      { _id: "2", name: "react-icons" },
      { _id: "3", name: "react" },
    ],
    author: {
      _id: "1",
      name: "John Doe",
      picture: "url/to/picture",
      clerkId: "clerkIdValue",
    },
    upvotes: 200000,
    views: 100,
    answers: [], 
    createdAt: new Date("2024-01-03T00:00:00.000Z"),
  },
  {
    _id: "2",
    title: "How to center a div ?",
    tags: [
      { _id: "1", name: "css" },
      { _id: "2", name: "tailwindcss" },
      { _id: "3", name: "react" },
    ],
    author: {
      _id: "2",
      name: "Jane Doe",
      picture: "url/to/picture",
      clerkId: "clerkIdValue",
    },
    upvotes: 20000,
    views: 200,
    answers: [], 
    createdAt: new Date("2024-02-01T00:00:00.000Z"),
  },
];

export default function Home() {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center ">
        <h1 className="h1-bold text-dark100_light900 "> All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button
            className="primary-gradient min-h-[46px]
          px-4 py-3 !text-light-900"
          >
            Ask a question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex"
        />
        <Filter 
        filters={HomePageFilters}
        otherClasses="min-h-[56px] sm:min-w-[170px]"
        containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => {
            return (
              <QuestionCard
                key={question._id}
                _id={question._id}
                title={question.title}
                tags={question.tags}
                author={question.author}
                upvotes={question.upvotes}
                views={question.views}
                answers={question.answers}
                createdAt={question.createdAt}
              />
            );
          })
        ) : (
          <NoResult
            title="There's no question to show"
            description="Be the first to break the silence ! 🚀 Ask a question and kickstart the discussion. our query could be the next big thing others learn from. Get involved!💡"
            link="/ask-question"
            LinkTitle="Ask a question"
          />
        )}
      </div>
    </>
  );
}
