export interface AnalizableNode 
{
    /* the gain node that should be used for drawing the sound (for AnalyserNode)
    ** this gain should be returned by the 'getAnalyserGainNode()' method */
    analyserGainNode: GainNode;

    getAnalyserGainNode(): GainNode;
}