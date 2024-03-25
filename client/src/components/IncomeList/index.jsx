import { Link } from 'react-router-dom';

const IncomeList = ({ incomes, title }) => {
//   if (!incomes.length) {
//     return <h3>No Incomes Yet</h3>;
//   }

  return (
    <div>
      <h3>{title}</h3>
      {incomes &&
        incomes.map((income) => (
          <div key={income._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {income.incomeAuthor} <br />
              {/* <span style={{ fontSize: '1rem' }}>
                had this thought on {income.createdAt}
              </span> */}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{income.incomeText}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/income/${income._id}`}
            >
              Join the discussion on this thought.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default IncomeList;