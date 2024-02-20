
export const getResourceColor = (resourceName: string) => {
    switch (resourceName) {
        case 'wood':
            return 'brown'
        case 'stone':
            return 'grey'
        case 'food':
            return 'green'
        case 'gold':
            return 'gold'
        case 'water':
            return 'blue'
        default:
            return 'black'
    }
}