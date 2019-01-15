class OverDrive extends AudioWorkletProcessor {
    static get parameterDescriptors () {
        return [{
            name: 'drive',
            defaultValue: 0,
            minValue: 0,
            maxValue: 1,
            automationRate: "k-rate"
        }];
    }
    process (inputs, outputs, parameters) {
        let input = inputs[0];
        let output = outputs[0];
        let drv = Math.pow(0.05,Math.abs(parameters.drive[0]));
        for (let channel = 0; channel < output.length; ++channel) {
            for (let i = 0; i < output[channel].length; ++i) {
                var d=input[channel][i];
                if(d<0)
                    output[channel][i]=-Math.pow(-d,drv);
                else
                    output[channel][i]=Math.pow(d,drv);
            }
        }
        return true;
    }
}
registerProcessor("OverDrive", OverDrive);
