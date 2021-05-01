const defaultTransition = {
    in: {
        opacity: 1,
        x: 0
    },
    out: {
        opacity: 0,
        x: '-100%'
    }
}
const secondDefaultTransition = {
    in: {
        opacity: 1,
        x: 0
    },
    out: {
        opacity: 0,
        x: '100%'
    }
}
const pageTransition = {
    duration: 0.5
}

export { defaultTransition, pageTransition,secondDefaultTransition }