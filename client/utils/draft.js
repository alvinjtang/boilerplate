export default function draft (lists) {
  let count = 0;
  let used = {};
  let arrNumber = 0;
  let direction = 'right';
  let toggle = false;
  while (count < lists[0].movies.length) {
    let i = 0;
    while (i < lists[arrNumber].movies.length) {
      if (used[lists[arrNumber].movies[i]] === undefined) {
        used[lists[arrNumber].movies[i]] = lists[arrNumber].playerName;
        count++;
        break;
      } else {
        i++;
      }
    }
    i = 0;
    if (direction === 'right' && arrNumber !== lists.length-1 && toggle === false) {
      arrNumber++;
    }
    if (direction === 'left' && arrNumber !== 0 && toggle === false) {
      arrNumber--
    }
    if (arrNumber === lists.length-1) {
      direction = 'left'
      if (toggle === true) {
        toggle = false
      } else {
        toggle = true
      }
    }
    if (arrNumber === 0) {
      direction = 'right'
      if (toggle === true) {
        toggle = false
      } else {
        toggle = true
      }
    }
  }
  let roster = {};
  for (let key in used) {
    if (!roster[used[key]]) roster[used[key]] = [key];
    else roster[used[key]].push(key)
  }
  let final = [];
  let id = 0;
  for (let player in roster) {
    final.push({
      id: id,
      playerName: player,
      movies: roster[player]
    })
    id++;
  }
  return final;
}
