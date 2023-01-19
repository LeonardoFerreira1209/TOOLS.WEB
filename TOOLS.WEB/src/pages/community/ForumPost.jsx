import React from 'react';

import ForumLeftContent from '../../partials/community/ForumLeftContent';
import ForumEntry from '../../partials/community/ForumEntry';
import ForumRightContent from '../../partials/community/ForumPostRightContent';

function ForumPost() {
  return (
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 md:py-0 w-full max-w-9xl mx-auto">

            <div className="xl:flex">

              {/* Left + Middle content */}
              <div className="md:flex flex-1">

                {/* Left content */}
                <ForumLeftContent />

                {/* Middle content */}
                <div className="flex-1 md:ml-8 xl:mx-4 2xl:mx-8">
                  <div className="md:py-8">

                    {/* Forum entry */}
                    <ForumEntry />

                  </div>
                </div>                

              </div>

              {/* Right content */}
              <ForumRightContent />              

            </div>

          </div>
        </main>
  );
}

export default ForumPost;