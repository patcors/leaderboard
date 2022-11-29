import { numberToRank } from "../utils/rankingStringUtils";

type BoardGameCardProps = {
  imageUrl: string;
  name: string;
  overallRank: number;
  userRank: number;
};

export const BoardGameCard = ({
  imageUrl,
  name,
  overallRank,
  userRank,
}: BoardGameCardProps): JSX.Element => {
  return (
    <div className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
      <div className="flex-shrink-0">
        <img className="h-10 w-10 rounded-full" src={imageUrl} alt="" />
      </div>
      <p className="text-sm font-medium text-gray-900">
        {numberToRank(overallRank)}
      </p>
      <p className="text-sm font-medium text-gray-900">{name}</p>
      <div className="min-w-0 flex-1">
        <a href="#" className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />

          <p className="truncate text-sm text-gray-500">
            You ranked it: {numberToRank(userRank)}
          </p>
        </a>
      </div>
    </div>
  );
};
