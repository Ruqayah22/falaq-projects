// // DayCounter.view.tsx
// import { useDayStore } from "./app.context";
// import { useObservable } from "../utils";

// export const DayView = () => {
//   const { state: {selectedDate$}, actions: {setDate} } = useDayStore();
//   const day = useObservable<Date | null>(selectedDate$);



//   const getDayDiff = (date: Date) => {
//     const now = new Date();
//     const diffTime = Math.abs(now.getTime() - date.getTime());
//     return Math.floor(diffTime / (1000 * 60 * 60 * 24));
//   };

//   return (
//     <div style={{ padding: "1rem", fontFamily: "Arial" }}>
//       <h2>📅 Day Counter</h2>
//       <input
//         type="date"
//         onChange={(e) => {
//           const val = e.target.value;
//           setDate(new Date(val));
//         }}
//       />
//       {day && (
//         <div style={{ marginTop: "1rem" }}>
//           <p>
//             Selected Date: <strong>{day?.toDateString()}</strong>
//           </p>
          
//           <p>
//             Days Passed: <strong>{getDayDiff(day)} days</strong>
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

import { useDayStore } from "./app.context";
import { useObservable } from "../utils";

export const DayView = () => {
  const {
    state: { selectedDate$ },
    actions: { setDate },
  } = useDayStore();
  const day = useObservable<Date | null>(selectedDate$);

  const getDayDiff = (date: Date) => {
    const now = new Date();
    const diffTime = date.getTime() - now.getTime(); // positive = future
    return Math.ceil(Math.abs(diffTime) / (1000 * 60 * 60 * 24));
  };

  const isFutureDate = (date: Date) => {
    const today = new Date();
    // Remove time portion for accurate day comparison
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    return date.getTime() > today.getTime();
  };

  return (
    <div style={{ padding: "1rem", fontFamily: "Arial" }}>
      <h2>📅 Day Counter</h2>
      <input
        type="date"
        data-testid="count-input"
        onChange={(e) => {
          const val = e.target.value;
          setDate(new Date(val));
        }}
      />
      {day && (
        <div style={{ marginTop: "1rem" }}>
          <p>
            Selected Date: <strong>{day.toDateString()}</strong>
          </p>

          {isFutureDate(day) ? (
            <p>
              Days to come: <strong>{getDayDiff(day)} days</strong>
            </p>
          ) : (
            <p>
              Days passed: <strong>{getDayDiff(day)} days</strong>
            </p>
          )}
        </div>
      )}
    </div>
  );
};
