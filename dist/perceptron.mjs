/*
 * Perceptron.mjs
 * Copyright 2026 Alexandre Brillant
 */

/* 
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the &quot;Software&quot;), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

export class Perceptron {

    #samples = [];
    #weights = null;
    #biais = 0;

    // W*X
    scalarProduct( sample ) {
        let scalar = this.#biais;
        for ( let i = 0; i < sample.length; i++ ) {
            scalar += sample[ i ] * this.#weights[ i ];
        }
        return scalar;
    }

    #outputs = {};
    #output = -1;
    #labels = [];

    weight( index ) {
        return this.#weights[ index ];
    }

    biais() {
        return this.#biais;
    }

    addTrainingSample( {sample, label} ) {
        if ( !Array.isArray( sample ) )
            throw "Invalid sample, must be an Array";

        if ( this.#samples.length > 0 ) {
            const previousLength = this.#samples.at( -1 ).sample.length;
            if ( previousLength != sample.length ) 
                throw "Invalid sample size, must have a x" + previousLength + " size";
        }

        this.#weights = this.#weights ?? new Array( sample.length ).fill( 0.0 );

        if ( !( label in this.#outputs ) ) {
            this.#outputs[ label ] = this.#output;
            this.#labels.push( label );
            this.#output += 2;
            if  ( this.#output > 4 ) 
                throw "Illegal label, must have only 2 labels"
        }        
        this.#samples.push( { sample, output:this.#outputs[ label ] } );
    }

    #updateWeights( { sample, output } ) {
        this.#biais += output;
        for ( let i = 0; i < sample.length; i++ ) {
            this.#weights[ i ] += output * sample[ i ];
        }
    }

    train( trainingSize = 100 ) {
        if ( this.#samples.length == 0 ) 
            throw "No training data ?";
        let errorFound = false;
        let totalError = 0;
        do {
            errorFound = false;
            totalError = 0;    
            this.#samples.forEach( 
                ( { sample, output } ) => {
                    if ( output * this.scalarProduct( sample ) <= 0 ) {
                        errorFound = true;
                        totalError++;
                        this.#updateWeights( { sample, output } );
                    }
                } 
            );
            trainingSize--;
        } while ( trainingSize > 0 && errorFound );
        return totalError / this.#samples.length;
    }

    predict( sample ) {
        const result = this.scalarProduct( sample );
        if ( result >= 0 ) return this.#labels[ 1 ];
        return this.#labels[ 0 ];
    }

}