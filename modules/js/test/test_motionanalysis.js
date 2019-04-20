// //////////////////////////////////////////////////////////////////////////////////////
//
//  IMPORTANT: READ BEFORE DOWNLOADING, COPYING, INSTALLING OR USING.
//
//  By downloading, copying, installing or using the software you agree to this license.
//  If you do not agree to this license, do not download, install,
//  copy or use the software.
//
//
//                           License Agreement
//                For Open Source Computer Vision Library
//
// Copyright (C) 2013, OpenCV Foundation, all rights reserved.
// Third party copyrights are property of their respective owners.
//
// Redistribution and use in source and binary forms, with or without modification,
// are permitted provided that the following conditions are met:
//
//   * Redistribution's of source code must retain the above copyright notice,
//     this list of conditions and the following disclaimer.
//
//   * Redistribution's in binary form must reproduce the above copyright notice,
//     this list of conditions and the following disclaimer in the documentation
//     and/or other materials provided with the distribution.
//
//   * The name of the copyright holders may not be used to endorse or promote products
//     derived from this software without specific prior written permission.
//
// This software is provided by the copyright holders and contributors "as is" and
// any express or implied warranties, including, but not limited to, the implied
// warranties of merchantability and fitness for a particular purpose are disclaimed.
// In no event shall the Intel Corporation or contributors be liable for any direct,
// indirect, incidental, special, exemplary, or consequential damages
// (including, but not limited to, procurement of substitute goods or services;
// loss of use, data, or profits; or business interruption) however caused
// and on any theory of liability, whether in contract, strict liability,
// or tort (including negligence or otherwise) arising in any way out of
// the use of this software, even if advised of the possibility of such damage.
//

// Author : Riccardo Trocca, Analytics Training. riccardo.trocca[at]gmail[dot]com

if (typeof module !== 'undefined' && module.exports) {
    // The envrionment is Node.js
    var cv = require('./opencv.js'); // eslint-disable-line no-var
}


QUnit.module('MotionAnalysis', {});

QUnit.test('accumulate', function(assert) {
    {
        let one = new cv.Mat.ones( new cv.Size(10,10), cv.CV_8UC1);
        let acc = new cv.Mat(10,10, cv.CV_32FC1);
        cv.accumulate(one, acc);
        assert.ok(acc.data32F[0] === 1);
        one.delete();
        acc.delete();
    }
});

QUnit.test('accumulateProduct', function(assert) {
    {
        let one = new cv.Mat.ones( new cv.Size(10,10), cv.CV_8UC1);
        let two = new cv.Mat.ones( new cv.Size(10,10), cv.CV_8UC1);
        for (let i = 0; i < one.cols * one.rows; i++) {
            one.data[i] = 2 * one.data[1];
            two.data[i] = 2 * two.data[1];
        }
        let acc = new cv.Mat(10,10, cv.CV_32FC1);
        cv.accumulateProduct(one, two, acc);
        assert.ok(acc.data32F[0] === 4);
        one.delete();
        two.delete();
        acc.delete();
    }
});

QUnit.test('accumulateSquare', function(assert) {
    {
        let one = new cv.Mat.ones( new cv.Size(10,10), cv.CV_8UC1);
        for (let i = 0; i < one.cols * one.rows; i++) {
            one.data[i] = 2 * one.data[1];
        }
        let acc = new cv.Mat(10,10, cv.CV_32FC1);
        cv.accumulateSquare(one, acc);
        assert.ok(acc.data32F[0] === 4);
        one.delete();
        acc.delete();
    }
});

QUnit.test('accumulateWeighted', function(assert) {
    {
        let one = new cv.Mat.ones( new cv.Size(20,20), cv.CV_8UC1);
        let acc = new cv.Mat(20,20, cv.CV_32FC1);
        cv.accumulateWeighted(one, acc, 0.5);
        assert.ok(acc.data32F[0] === 0.5);
        one.delete();
        acc.delete();
    }
});