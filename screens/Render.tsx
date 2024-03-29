import { StyleSheet, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import IsReadyPDB from '../components/IsPdbReady';
import { fetchProteinModel } from '../utils/api';
import ProtScene from '../components/Scene';
import { TPDB } from '../utils/render/types.type';


export default function Render() {
  const route = useRoute();
  const [loading, setLoader] = useState(true);
  const [pdb, setPDB] = useState<TPDB>()
  const [loadError, setError] = useState(undefined)

  const { item: ligand } = route.params as { item: string } || { item: "SPM" };

  useEffect(() => {
    setLoader(true);

    fetchProteinModel(ligand)
      .then((data: any) => setPDB(data))
      .catch((err: any) => setError(err.message || err))
      .finally(() => setLoader(false))
  }, [])

  return (
    <View style={styles.container}>
      <IsReadyPDB ligand={ligand} loader={loading} loadError={loadError}>
        <ProtScene data={pdb as TPDB} ligand={ligand} />
      </IsReadyPDB>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
