<script>
export default {
  name: 'Matches',
  data() {
    return {
      matches: [
        { id: 1, date: '2023-06-28', team1: 'Germany', team2: 'Denmark', score: '2:0' },
        { id: 2, date: '2023-06-29', team1: 'Spain', team2: 'Georgia' },
        { id: 3, date: '2023-07-01', team1: 'Turkey', team2: 'Austria' }
      ],
      yesterdayMatches: [],
      todayMatches: [],
      futureMatches: [],
      selectedDate: null
    }
  },
  methods: {
    fetchMatches() {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + 2); // Hier können Sie das Datum anpassen

      const formattedToday = today.toISOString().split('T')[0];
      const formattedYesterday = yesterday.toISOString().split('T')[0];
      const formattedFutureDate = futureDate.toISOString().split('T')[0];

      this.yesterdayMatches = this.matches.filter(match => match.date === formattedYesterday);
      this.todayMatches = this.matches.filter(match => match.date === formattedToday);
      this.futureMatches = this.matches.filter(match => match.date === formattedFutureDate);
    }
  },
  created() {
    this.fetchMatches();
  }
}
</script>


<template>
  <div>
    <h1>EM Matches</h1>
    <div class="timeline">
      <div class="timeline-item">
        <h2>Yesterday's Matches</h2>
        <ul>
          <li v-for="match in yesterdayMatches" :key="match.id">{{ match.date }}: {{ match.team1 }} vs {{ match.team2 }} - {{ match.score }}</li>
        </ul>
      </div>
      <div class="timeline-item">
        <h2>Today's Matches</h2>
        <ul>
          <li v-for="match in todayMatches" :key="match.id">{{ match.date }}: {{ match.team1 }} vs {{ match.team2 }}</li>
        </ul>
      </div>
      <div class="timeline-item">
        <h2>Future Matches</h2>
        <ul>
          <li v-for="match in futureMatches" :key="match.id">{{ match.date }}: {{ match.team1 }} vs {{ match.team2 }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>


<style scoped>
h1 {
  margin-top: 20px;
  text-align: center;
}

.timeline {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.timeline-item {
  margin: 20px 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
}
</style>
