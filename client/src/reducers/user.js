const initState = {
    move: 'x',
    isWin: false
}

const userReduser = (state = initState, action) => {
    switch (action.type) {
        case 'FIND_WINER': {
            const newState = { ...state };
            const place = [...action.payload]

            const rows = place.map(row => row.filter((item, idx, self) => self.indexOf(item) === idx || item === ''));
            rows.map(i => {
                if (i.length === 1) {
                    newState.isWin = true
                    newState.move = i[0]
                }
                return i;
            });

            let cols = [];
            for (let i = 0; i < 3; i++) {
                let res = [];
                for (let j = 0; j < 3; j++) {
                    res.push(place[j][i]);
                }
                cols.push(res);
            }

            cols.map(col => col.filter((item, idx, self) => self.indexOf(item) === idx || item === '')).map(i => {
                if (i.length === 1) {
                    newState.isWin = true;
                    newState.move = i[0];
                }
                return i;
            });

            let diaganals = [[], []];

            for (let i = 0, j = 2; i < 3 && j > -1; i++, j--) {
                diaganals[0].push(place[i][i]);
                diaganals[1].push(place[i][j]);
            }

            diaganals.map(diaganal => (
                diaganal.filter((item, idx, self) => self.indexOf(item) === idx || item === '')
            )).map(i => {
                if (i.length === 1) {
                    newState.isWin = true;
                    newState.move = i[0];
                }
                return i;
            })

            return newState;
        }
        case 'SWITCH_MOVE': {
            const move = state.move === 'x' ? 'o' : 'x';

            return { ...state, move: move };
        }
        default:
            return state;
    }
}
export default userReduser;