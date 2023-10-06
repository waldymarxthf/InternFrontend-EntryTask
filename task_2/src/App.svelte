<script lang="ts">
  import { onMount } from "svelte";
  import { CURRENCIES } from "./lib/constants";
  import { fetchExchangeRate } from "./api/getExсhangeRate";

  let selectedCurrencyFirst = "USD";
  let selectedCurrencySecond = "EUR";
  
  let firstAmount = "0";
  let secondAmount = "0";

  let conversionRate = 1;

  function roundIfNeeded(num) {
    const rounded = Math.round(num * 100) / 100;
    return rounded === Math.floor(rounded)
      ? rounded.toFixed(0)
      : rounded.toFixed(3);
  }

  async function updateConversionRate() {
    try {
      const rate = await fetchExchangeRate(
        selectedCurrencyFirst,
        selectedCurrencySecond
      );
      conversionRate = rate;
    } catch (error) {
      console.error("Failed to fetch exchange rate:", error);
      conversionRate = 1;
    }
  }

  function convertAmount1to2() {
    if (firstAmount !== "") {
      secondAmount = roundIfNeeded(+firstAmount * conversionRate).toString();
    } else {
      secondAmount = "";
    }
  }

  function convertAmount2to1() {
    if (secondAmount !== "") {
      firstAmount = roundIfNeeded(+secondAmount / conversionRate).toString();
    } else {
      firstAmount = "";
    }
  }

  onMount(async () => {
    await updateConversionRate();
    convertAmount1to2();
  });

  $: updateConversionRate(), selectedCurrencyFirst, selectedCurrencySecond;
  $: convertAmount1to2(), firstAmount, conversionRate;
  $: convertAmount2to1(), secondAmount, conversionRate;
</script>

<form>
  <select bind:value={selectedCurrencyFirst}>
    {#each CURRENCIES as currency}
      <option value={currency}>{currency}</option>
    {/each}
  </select>
  <input
    type="number"
    bind:value={firstAmount}
    on:input={() => convertAmount1to2()}
    placeholder="Amount in {selectedCurrencyFirst}"
  />

  <select bind:value={selectedCurrencySecond}>
    {#each CURRENCIES as currency}
      <option value={currency}>{currency}</option>
    {/each}
  </select>
  <input
    type="number"
    bind:value={secondAmount}
    on:input={() => convertAmount2to1()}
    placeholder="Amount in {selectedCurrencySecond}"
  />
</form>

<style>
</style>
