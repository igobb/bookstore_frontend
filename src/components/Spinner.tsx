import { Grid } from 'react-loader-spinner'

export default function Spinner() {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <Grid
        height="120"
        width="120"
        color="#9CA3AF"
        ariaLabel="grid-loading"
        radius="12.5"
        visible={true}
      />
    </div>
  )
}
