<script setup lang="ts">
import { onMounted } from 'vue';
import { useTableStore, type RecordType } from '@/stores/table';
import Table from '@/components/Table.vue';
import {
  deletePlayersByIdStatsByGameId,
  getPlayersStats,
  patchPlayersByIdStatsByGameId,
  postPlayerStat,
} from '@/generated/web-api';
import { Alert } from '@/functions/alert';
import { Toast } from '@/functions/toast';
import { useAuthSessionStore } from '@/stores/authSession';

const authSession = useAuthSessionStore();
const table = useTableStore();

table.setDeletable(true);
table.setFields({
  id: {
    name: 'ID',
    type: Number,
    creatable: false,
    updatable: false,
    visible: false,
  },
  game_id: {
    name: 'GAME-ID',
    type: Number,
    creatable: false,
    updatable: false,
    visible: false,
  },
  game_date: {
    // The field key name is compliant with the API Spec
    name: 'GAME',
    type: String,
    creatable: true,
    updatable: false,
    visible: true,
  },
  name: {
    name: 'PLAYER',
    type: String,
    creatable: true,
    updatable: false,
    visible: true,
  },
  score: {
    name: 'SCORE',
    type: Number,
    creatable: true,
    updatable: true,
    visible: true,
  },
  rebound: {
    name: 'REB',
    type: Number,
    creatable: true,
    updatable: true,
    visible: true,
  },
  assist: {
    name: 'AST',
    type: Number,
    creatable: true,
    updatable: true,
    visible: true,
  },
  hit: {
    name: 'HIT',
    type: Number,
    creatable: true,
    updatable: true,
    visible: true,
  },
  free_throw: {
    name: 'FT',
    type: Number,
    creatable: true,
    updatable: true,
    visible: true,
  },
  steal: {
    name: 'STEAL',
    type: Number,
    creatable: true,
    updatable: true,
    visible: true,
  },
});
table.setCreate(async (record) => {
  try {
    if (typeof record.game_date !== 'string') {
      throw new TypeError('GAME is required');
    }
    const [game_date, game_home_abbr, game_away_abbr] =
      record.game_date.split(' ');
    let response: RecordType = await postPlayerStat({
      requestBody: {
        game_away_abbr: game_away_abbr as string,
        game_date: game_date as string,
        game_home_abbr: game_home_abbr as string,
        name: record.name as string,
        assist: record.assist as number,
        free_throw: record.free_throw as number,
        hit: record.hit as number,
        rebound: record.rebound as number,
        score: record.score as number,
        steal: record.steal as number,
      },
    });
    response = formatGameDate(response);
    Toast.showSuccess('Create');
    return response;
  } catch (error) {
    Toast.showFailure('Create', error);
    return;
  }
});
table.setRead(async (parameters) => {
  try {
    return (await getPlayersStats(parameters)).map(formatGameDate);
  } catch (error) {
    Alert.showFailure('Read', error);
    return;
  }
});
table.setUpdate(async (record) => {
  try {
    await patchPlayersByIdStatsByGameId({
      id: record.id as number,
      gameId: record.game_id as number,
      requestBody: {
        assist: record.assist as number,
        free_throw: record.free_throw as number,
        hit: record.hit as number,
        rebound: record.rebound as number,
        score: record.score as number,
        steal: record.steal as number,
      },
    });
    Toast.showSuccess('Update');
    return true;
  } catch (error) {
    Toast.showFailure('Update', error);
    return false;
  }
});
table.setDelete(async (record) => {
  try {
    await deletePlayersByIdStatsByGameId({
      id: record.id as number,
      gameId: record.game_id as number,
    });
    Toast.showSuccess('Delete');
    return true;
  } catch (error) {
    Toast.showFailure('Delete', error);
    return false;
  }
});

onMounted(async () => {
  table.setReadSortField('game_date');
  table.setReadSortOrder('descending');
  await table.readRecords();
});

function formatGameDate(record: RecordType): RecordType {
  return {
    ...record,
    game_date: [
      record.game_date,
      record.game_home_abbr,
      record.game_away_abbr,
    ].join(' '),
  };
}
</script>

<template>
  <Table
    id="player-stat-view-vue"
    :editable="authSession.exists"
    :table="table" />
</template>
