import "../node_modules/jquery/dist/jquery.min.js"

var pesoUn = $("#peso-un")
var avisoBT = $("#aviso-bt")
var historicoPesosArr = []
var historicoPesosElm = $("#pesos-historico")
var btScan = null
var btNotSupported = false
var gatilhoDefinitivo = false

var registraHistorico = function(peso){
    historicoPesosArr = [peso, ...historicoPesosArr].slice(0,5)
    historicoPesosElm.empty()
    for(let item of historicoPesosArr){
        let elm = $("<li />").addClass("list-group-item").text(item)
        historicoPesosElm.append(elm)
    }
}
var verificaBTLE = async function(e){
    let { device, uuids, name, appearance, txPower, rssi, manufacturerData, serviceData, } = e
    let scaleKey = null
    let scaleValues = null
    console.debug({ device, uuids, name, appearance, txPower, rssi, manufacturerData, serviceData, })

    if(manufacturerData.size != 1){
        console.warn(`Ignorando dispositivo: manufacturerData.size = ${manufacturerData.size}`)
        return
    }

    for(let [key, data] of manufacturerData.entries()){
        if(data.byteLength != 13){
            console.warn(`Ignorando dispositivo: quantidade de bytes difere = ${data.byteLength}`)
            return
        }

        scaleKey = key
        scaleValues = [...new Uint8Array(data.buffer)]
    }

    let peso = (scaleValues[1] + 256 * scaleValues[0]) / 100
    let unidade = ["lb", "kg", "st:lb"][(scaleValues[6]&12)>>2]
    let definitivo = ((scaleValues[6] & 1) == 1)
    let pesoUnT = `${peso} ${unidade}`
    pesoUn.text(pesoUnT)

    pesoUn.toggleClass("text-success", definitivo)
    if(gatilhoDefinitivo != definitivo){
        gatilhoDefinitivo = definitivo
        if(definitivo)
            registraHistorico(pesoUnT)
    }
}

document.addEventListener("click", async function(){
    if(btNotSupported) return
    
    if(btScan){
        btScan.stop()
        btScan = null
        avisoBT.html("Bem-vindo!<br>Toque em qualquer lugar da página para iniciar").removeClass("alert-success").addClass("alert-info")
        return
    }

    try {
        btScan = await navigator.bluetooth.requestLEScan({
            acceptAllAdvertisements: true
        })
    } catch(e){
        btScan = null
        btNotSupported = true
        avisoBT.html("Falha ao obter permissão de Bluetooth:<br>" + String(e)).removeClass("alert-info").addClass("alert-danger")
        return
    }

    navigator.bluetooth.addEventListener("advertisementreceived", verificaBTLE)
    avisoBT.html("Aguardando dados da balança.<br>Toque em qualquer lugar da página para parar").removeClass("alert-info").addClass("alert-success")
})
