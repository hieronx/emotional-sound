// Required to run WebPD, as it binds to the window object
const window = self
importScripts('scripts/webpd-latest.js')

let patch = null

fetch('http://localhost:5000/main.pd').then((response) => {
    return response.text()
}).then((mainPatch) => {
    fetch('http://localhost:5000/playsound.pd').then((response) => {
        return response.text()
    }).then((playsoundPatch) => {
        fetch('http://localhost:5000/customline.pd').then((response) => {
            return response.text()
        }).then((customlinePatch) => {
            Pd.registerAbstraction('playsound', playsoundPatch)
            Pd.registerAbstraction('customline', customlinePatch)

            patch = Pd.loadPatch(mainPatch)
            Pd.start()

            Pd.send('crowd_size', [0])
            Pd.send('mood', [0.5])
        })
    })
})

self.onmessage = function (e) {
    console.log(e.data);

    Pd.send('crowd_size', [0])
    Pd.send('mood', [0.5])
};