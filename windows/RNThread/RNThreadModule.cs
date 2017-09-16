using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace Thread.RNThread
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNThreadModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="RNThreadModule"/>.
        /// </summary>
        internal RNThreadModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNThread";
            }
        }
    }
}
