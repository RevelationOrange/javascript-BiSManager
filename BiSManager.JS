class GearSet {
    constructor() {
        this.slots = {
            "mainHand": "",
            "offHand": "",
            "head": "",
            "body": "",
            "hands": "",
            "legs": "",
            "feet": "",
            "ears": "",
            "neck": "",
            "wrists": "",
            "ring0": "",
            "ring1": ""
        }
        this.got = {
            "mainHand": false,
            "offHand": false,
            "head": false,
            "body": false,
            "hands": false,
            "legs": false,
            "feet": false,
            "ears": false,
            "neck": false,
            "wrists": false,
            "ring0": false,
            "ring1": false
        }
    }

    setItem(slot, item) { this.slots[slot] = item }
    setGot(slot, got) { this.got[slot] = got }

    getItem(slot) { return this.slots[slot] }
    getGot(slot) { return this.got[slot] }
}

class BiSTracker {
    constructor(name) {
        var main = new GearSet()
        var alt0 = new GearSet()
        var alt1 = new GearSet()
        var mainName = ""
        var alt0Name = ""
        var alt1Name = ""
        var playerName = name
    }

    pickGS(job) {
        var gset
        if (job == "main") { gs = this.main }
        else if (job == "alt0") { gs = this.alt0 }
        else { gs = this.alt1 }
        return gset
    }

    setSlotItem(job, slot, item) { this.pickGS(job).setItem(slot, item) }
    setSlotGot(job, slot, got) { this.pickGS(job).setItem(slot, got) }
    setJobName(job, name) {
        if (job == "main") { this.mainName = name }
        else if (job == "alt0") { this.alt0Name = name }
        else { this.alt1Name = name }
    }
    setPlayerName(pname) { this.playerName = pname }

    getSlotItem(job, slot) { this.pickGS(job).getItem(slot) }
    getSlotGot(job, slot) { this.pickGS(job).getGot(slot) }
    getJobName(job) {
        if (job == "main") { return this.mainName }
        else if (job == "alt0") { return this.alt0Name }
        else { return this.alt1Name }
    }
    getPlayerName() { return this.playerName }
}

class BiSManager {
    constructor() {
        this.playerList = {}
        this.jobTranslator = { "main": "main", "primary": "main", "first": "main", "secondary": "alt0", "alt1": "alt0", "second": "alt0", "tertiary": "alt1", "third": "alt1", "alt2": "alt1" }
        this.slotTranslator = {}

        for (let s in ["mainHand", "weapon"]) { this.slotTranslator[s.toLowerCase] = "mainHand" }
        for (let s in ["offHand", "shield"]) { this.slotTranslator[s.toLowerCase] = "offHand" }
        for (let s in ["head", "hat"]) { this.slotTranslator[s.toLowerCase] = "head" }
        for (let s in ["body", "chest"]) { this.slotTranslator[s.toLowerCase] = "body" }
        for (let s in ["hands", "hand", "arms", "arm"]) { this.slotTranslator[s.toLowerCase] = "hands" }
        for (let s in ["legs", "leg"]) { this.slotTranslator[s.toLowerCase] = "legs" }
        for (let s in ["feet", "foot"]) { this.slotTranslator[s.toLowerCase] = "feet" }
        for (let s in ["ears", "ear", "earrings", "earring"]) { this.slotTranslator[s.toLowerCase] = "ears" }
        for (let s in ["neck", "necklace"]) { this.slotTranslator[s.toLowerCase] = "neck" }
        for (let s in ["wrists", "wrist", "bracelets", "bracelet"]) { this.slotTranslator[s.toLowerCase] = "wrists" }
        for (let s in ["ring0", "rightring", "rring"]) { this.slotTranslator[s.toLowerCase] = "ring0" }
        for (let s in ["ring1", "leftring", "lring"]) { this.slotTranslator[s.toLowerCase] = "ring1" }
    }

    addPlayer(name) { this.playerList[name] = new BiSTracker(name) }
    setPlayerName(player, pname) { this.playerList[player].setPlayerName(pname) }
    setPlayerJobName(playerName, job, jobName) {
        if (job in this.jobTranslator) { this.playerList[playerName].setJobName(this.jobTranslator[job], jobName) }
        else { console.log("throw invalid job exception") }
    }
    setPlayerJobSlotItem(player, job, slot, item) {
        if (job in this.jobTranslator) {
            if (slot in this.slotTranslator) { this.playerList[player].setSlotItem(this.jobTranslator[job], this.slotTranslator[slot], item) }
            else { console.log("throw invalid slot exception") }
        }
        else { console.log("throw invalid job exception") }
    }
    setPlayerJobSlotGot(player, job, slot, got) {
        if (job in this.jobTranslator) {
            if (slot in this.slotTranslator) { this.playerList[player].setSlotGot(this.jobTranslator[job], this.slotTranslator[slot], got) }
            else { console.log("throw invalid slot exception") }
        }
        else { console.log("throw invalid job exception") }
    }

    getPlayerList() { return this.playerList }
    getPlayerName(player) { return this.playerList[player].getPlayerName }
    getPlayerJobName(playerName, job) {
        if (job in this.jobTranslator) { return this.playerList[playerName].getJobName(this.jobTranslator[job]) }
        else { console.log("throw invalid job exception") }
    }
    getPlayerJobSlotItem(player, job, slot) {
        if (job in this.jobTranslator) {
            if (slot in this.slotTranslator) { return this.playerList[player].getSlotItem(this.jobTranslator[job], this.slotTranslator[slot]) }
            else { console.log("throw invalid slot exception") }
        }
        else { console.log("throw invalid job exception") }
    }
    getPlayerJobSlotGot(player, job, slot) {
        if (job in this.jobTranslator) {
            if (slot in this.slotTranslator) { return this.playerList[player].getSlotGot(this.jobTranslator[job], this.slotTranslator[slot]) }
            else { console.log("throw invalid slot exception") }
        }
        else { console.log("throw invalid job exception") }
    }

    getAllSlots(slot) {
        if (slot in this.slotTranslator) {
            var slotList = []
            for (player in this.playerList) {
                for (i in ["main", "alt0", "alt1"]) {
                    var got
                    if (this.getPlayerJobSlotGot(player, i, slot)) { got = "x" }
                    else { got = "." }
                    slotList.push([player, i, this.getPlayerJobSlotItem(player, i, slot), got])
                }
            }
            return slotList
        }
        else { console.log("throw invalid slot exception") }
    }
}
