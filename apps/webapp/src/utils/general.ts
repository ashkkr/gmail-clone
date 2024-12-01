export function getTimeSince(absoluteTime: Date) {
  let timeDifference = new Date().getTime() - absoluteTime.getTime();

  let createdSince: string;
  timeDifference = timeDifference / 1000; // converting to seconds
  if (timeDifference < 60) {
    createdSince = `${Math.floor(timeDifference)} seconds ago`;
  } else {
    timeDifference = timeDifference / 60; // converting to minutes
    if (timeDifference < 60) {
      createdSince = `${Math.floor(timeDifference)} minutes ago`;
    } else {
      timeDifference = timeDifference / 60; // converting to hours
      if (timeDifference < 24) {
        createdSince = `${Math.floor(timeDifference)} hours ago`;
      } else {
        timeDifference = timeDifference / 24; // converting to days
        createdSince = `${Math.floor(timeDifference)} days ago`;
      }
    }
  }
  return createdSince;
}
