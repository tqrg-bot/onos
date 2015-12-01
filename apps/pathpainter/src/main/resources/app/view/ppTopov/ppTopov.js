/*
 * Copyright 2015 Open Networking Laboratory
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
 Sample Demo module. This contains the "business logic" for the topology
 overlay that we are implementing.
 */

(function () {
    'use strict';

    // injected refs
    var $log, fs, flash, wss;

    // constants
    var srcMessage = 'ppTopovSetSrc',
        dstMessage = 'ppTopovSetDst',
        modeMessage = 'ppTopovSetMode',
        nextPathMessage = 'ppTopovNextPath',
        prevPathMessage = 'ppTopovPrevPath';

    // internal state
    var currentMode = null;


    // === ---------------------------
    // === Helper functions


    // === ---------------------------
    // === Main API functions


    function setSrc(node) {
        wss.sendEvent(srcMessage, {
            id: node.id
        });
        flash.flash('Source node: ' + node.id);
    }

    function setDst(node) {
        wss.sendEvent(dstMessage, {
            id: node.id
        });
        flash.flash('Destination node: ' + node.id);
    }

    function nextPath(node) {
        wss.sendEvent(nextPathMessage);
    }

    function prevPath(node) {
        wss.sendEvent(prevPathMessage);
    }


    function setMode(mode) {
        if (currentMode === mode) {
            $log.debug('(in mode', mode, 'already)');
        } else {
            currentMode = mode;
            wss.sendEvent(modeMessage, {
                mode: mode
            });
            flash.flash('Path mode: ' + mode);
        }
    }

    // === ---------------------------
    // === Module Factory Definition

    angular.module('ovPpTopov', [])
        .factory('PathPainterTopovService',
        ['$log', 'FnService', 'FlashService', 'WebSocketService',

        function (_$log_, _fs_, _flash_, _wss_) {
            $log = _$log_;
            fs = _fs_;
            flash = _flash_;
            wss = _wss_;

            return {
                setSrc: setSrc,
                setDst: setDst,
                setMode: setMode,
                nextPath: nextPath,
                prevPath: prevPath
            };
        }]);
}());
