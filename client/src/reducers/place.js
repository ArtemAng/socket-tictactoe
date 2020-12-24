const initState = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']

]

const placeReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CELL_CHANGE': {
            const { rowId, collId, move } = action.payload;
            const newState = [...state];
            if (!newState[rowId][collId]) {
                newState[rowId][collId] = move
            }
            return newState;
        }

        default:
            return state;
    }
}
export default placeReducer;