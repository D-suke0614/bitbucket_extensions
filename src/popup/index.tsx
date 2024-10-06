import React, { useState } from "react"

import ToggleButton from "~src/components/ToggleButton/ToggleButton"

function IndexPopup() {
  const [hideResolved, setHideResolved] = useState<boolean>(false)
  const handleHideResolved = (isHide: boolean) => {
    setHideResolved(isHide)
  }

  return (
    <div>
      <ToggleButton isChecked={hideResolved} handleValue={handleHideResolved} />
    </div>
  )
}

export default IndexPopup
